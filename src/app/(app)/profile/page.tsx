"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useProgress } from "@/store/progress";
import { useMounted } from "@/lib/useMounted";
import { Panda } from "@/components/ui/Panda";
import {
  Trash2,
  Award,
  Flame,
  Target,
  Clock,
  UserPlus,
  LogOut,
  Edit3,
  Check,
  X,
  BookOpen,
  ArrowRight,
  User,
  Mail,
} from "lucide-react";

interface FriendUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
}

interface PendingRequest {
  id: string;
  user: FriendUser;
}

const AVATAR_OPTIONS = [
  "🐼", "🐉", "🏮", "🎋", "🌸", "🐅", "🦊", "🐇",
  "🎎", "🍵", "📚", "✍️", "🌙", "⭐", "🔥", "💎",
];

export default function ProfilePage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status ?? "unauthenticated";
  const chars = useProgress((s) => s.chars);
  const completed = useProgress((s) => s.completedLessons);
  const streak = useProgress((s) => s.streak);
  const reset = useProgress((s) => s.reset);
  const mounted = useMounted();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [friendUsername, setFriendUsername] = useState("");
  const [friendError, setFriendError] = useState("");
  const [friendLoading, setFriendLoading] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  const [profile, setProfile] = useState<{
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
  } | null>(null);

  const isLoggedIn = status === "authenticated" && session?.user;

  const fetchProfile = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch { /* ignore */ }
  }, [isLoggedIn]);

  const fetchFriends = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch("/api/friends");
      if (res.ok) {
        const data = await res.json();
        setFriends(data.friends || []);
        setPending(data.pending || []);
      }
    } catch { /* ignore */ }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, [fetchProfile, fetchFriends]);

  const startEditing = () => {
    setEditName(profile?.name || session?.user?.name || "");
    setEditUsername(profile?.username || "");
    setEditBio(profile?.bio || "");
    setEditAvatar(profile?.image || "");
    setEditing(true);
    setSaveError("");
  };

  const saveProfile = async () => {
    setSaveLoading(true);
    setSaveError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          username: editUsername || undefined,
          bio: editBio,
          image: editAvatar,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setSaveError(data.error || "Ошибка сохранения");
        return;
      }
      await fetchProfile();
      setEditing(false);
    } catch {
      setSaveError("Ошибка сети");
    } finally {
      setSaveLoading(false);
    }
  };

  const addFriend = async () => {
    if (!friendUsername.trim()) return;
    setFriendLoading(true);
    setFriendError("");
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: friendUsername.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFriendError(data.error || "Ошибка");
        return;
      }
      setFriendUsername("");
      await fetchFriends();
    } catch {
      setFriendError("Ошибка сети");
    } finally {
      setFriendLoading(false);
    }
  };

  const respondFriend = async (friendshipId: string, action: "accept" | "reject") => {
    try {
      await fetch("/api/friends", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendshipId, action }),
      });
      await fetchFriends();
    } catch { /* ignore */ }
  };

  if (!mounted || status === "loading") return null;

  const totalReviews = Object.values(chars).reduce(
    (s, c) => s + c.attempts,
    0
  );
  const knownChars = Object.values(chars).filter(c => c.correct > 0).length;

  const displayName = profile?.name || session?.user?.name || "Гость";
  const displayAvatar = profile?.image || session?.user?.image;
  const displayUsername = profile?.username;

  // Guest state — full-page CTA to login
  if (!isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-8 py-16 text-center">
        <div className="mb-8">
          <Panda mood="hello" size={120} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight mb-3">
          Войдите в аккаунт
        </h1>
        <p className="text-[var(--foreground-muted)] text-base leading-relaxed max-w-md mx-auto mb-8">
          Создайте аккаунт или войдите, чтобы сохранить прогресс, добавить друзей и синхронизировать обучение между устройствами
        </p>

        {/* Local stats preview */}
        {(completed.length > 0 || totalReviews > 0) && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="text-2xl font-semibold tabular-nums">{completed.length}</div>
              <div className="text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider mt-1">Уроков</div>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="text-2xl font-semibold tabular-nums">{knownChars}</div>
              <div className="text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider mt-1">Иероглифов</div>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="text-2xl font-semibold tabular-nums">{streak}</div>
              <div className="text-[11px] text-[var(--foreground-muted)] uppercase tracking-wider mt-1">Дней подряд</div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/login"
            className="btn btn-primary w-full h-12 text-base flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Войти или зарегистрироваться
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--foreground-soft)] mb-3">
            Сейчас вы используете гостевой режим. Прогресс сохраняется только на этом устройстве.
          </p>
          <button
            type="button"
            onClick={() => {
              if (confirm("Удалить весь локальный прогресс?")) reset();
            }}
            className="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            Сбросить прогресс
          </button>
        </div>
      </div>
    );
  }

  // Logged-in state
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {displayAvatar && displayAvatar.length <= 4 ? (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-4xl sm:text-5xl">
                {displayAvatar}
              </div>
            ) : displayAvatar ? (
              <img
                src={displayAvatar}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[var(--green-soft)] to-[var(--surface-2)] flex items-center justify-center">
                <User size={32} className="text-[var(--green)]" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="text-xl sm:text-2xl font-display font-medium truncate">
              {displayName}
            </h1>
            {displayUsername && (
              <div className="text-sm text-[var(--green)] font-medium mt-0.5">
                @{displayUsername}
              </div>
            )}
            {profile?.bio && (
              <p className="text-sm text-[var(--foreground-muted)] mt-2 line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--foreground-muted)]">
              <span>{friends.length} друзей</span>
              <span>{knownChars} иероглифов</span>
            </div>
          </div>

          {/* Edit button */}
          {!editing && (
            <button
              type="button"
              onClick={startEditing}
              className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors flex-shrink-0"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Edit panel */}
      {editing && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-medium mb-5">Редактировать профиль</h2>
          <div className="space-y-5">
            {/* Avatar selection */}
            <div>
              <label className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-2 block">
                Аватар
              </label>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-3xl border border-[var(--border)]">
                  {editAvatar || "🐼"}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatars(!showAvatars)}
                  className="text-sm text-[var(--green)] hover:underline font-medium"
                >
                  {showAvatars ? "Скрыть" : "Выбрать"}
                </button>
              </div>
              {showAvatars && (
                <div className="grid grid-cols-8 gap-2 p-3 bg-[var(--surface-2)] rounded-xl">
                  {AVATAR_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setEditAvatar(a); setShowAvatars(false); }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        editAvatar === a
                          ? "bg-white ring-2 ring-[var(--green)] shadow-sm"
                          : "hover:bg-white/60"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-2 block">
                Имя
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-2 block">
                Юзернейм
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-soft)] text-sm">@</span>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow font-mono"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-2 block">
                О себе
              </label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={2}
                maxLength={200}
                placeholder="Расскажите о себе..."
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow resize-none"
              />
              <div className="text-[10px] text-[var(--foreground-soft)] text-right mt-1">
                {editBio.length}/200
              </div>
            </div>

            {saveError && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{saveError}</div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={saveProfile}
                disabled={saveLoading}
                className="btn btn-primary h-10 px-5 text-sm flex items-center gap-1.5"
              >
                {saveLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Check size={14} /> Сохранить</>
                )}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="h-10 px-5 text-sm rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors flex items-center gap-1.5"
              >
                <X size={14} /> Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Target} label="Цель" value="20/день" />
        <StatCard icon={Clock} label="Время" value="20 мин" />
        <StatCard icon={Flame} label="Серия" value={`${streak} дн.`} accent />
        <StatCard icon={Award} label="Уроки" value={`${completed.length}`} />
      </div>

      {/* Quick stats bar */}
      <div className="bg-white rounded-2xl border border-[var(--border)] px-6 py-4 mb-6 flex items-center justify-between text-sm">
        <div>
          <span className="text-[var(--foreground-muted)]">Изучено иероглифов: </span>
          <span className="font-semibold tabular-nums">{knownChars}</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-[var(--foreground-muted)]">Всего ответов: </span>
          <span className="font-semibold tabular-nums">{totalReviews}</span>
        </div>
        <Link href="/review" className="text-[var(--green)] font-medium flex items-center gap-1 hover:underline">
          <BookOpen size={14} /> Повторить
        </Link>
      </div>

      {/* Friends */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium">Друзья</h2>
          {friends.length > 0 && (
            <span className="text-xs text-[var(--foreground-muted)] bg-[var(--surface-2)] px-2.5 py-1 rounded-lg">
              {friends.length}
            </span>
          )}
        </div>

        {/* Add friend */}
        <div className="flex gap-2 mb-5">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-soft)] text-sm">@</span>
            <input
              type="text"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              placeholder="username друга"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow font-mono"
              onKeyDown={(e) => e.key === "Enter" && addFriend()}
            />
          </div>
          <button
            type="button"
            onClick={addFriend}
            disabled={friendLoading || !friendUsername.trim()}
            className="w-10 h-10 rounded-xl bg-[var(--green)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <UserPlus size={16} />
          </button>
        </div>
        {friendError && (
          <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl mb-4">{friendError}</div>
        )}

        {/* Pending requests */}
        {pending.length > 0 && (
          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--foreground-soft)] mb-2.5">
              Входящие запросы
            </div>
            <div className="space-y-2">
              {pending.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--green-soft)]/30 border border-[var(--green)]/10"
                >
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-lg border border-[var(--border)]">
                    {p.user.image && p.user.image.length <= 4 ? p.user.image : <User size={16} className="text-[var(--foreground-soft)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {p.user.name || p.user.username || "—"}
                    </div>
                    {p.user.username && (
                      <div className="text-xs text-[var(--foreground-muted)]">@{p.user.username}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => respondFriend(p.id, "accept")}
                    className="w-8 h-8 rounded-lg bg-[var(--green)] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => respondFriend(p.id, "reject")}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends list */}
        {friends.length > 0 ? (
          <div className="divide-y divide-[var(--border)]">
            {friends.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-lg border border-[var(--border)]">
                  {f.image && f.image.length <= 4 ? f.image : <User size={16} className="text-[var(--foreground-soft)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {f.name || f.username || "—"}
                  </div>
                  {f.username && (
                    <div className="text-xs text-[var(--foreground-muted)]">@{f.username}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center mx-auto mb-3">
              <UserPlus size={20} className="text-[var(--foreground-soft)]" />
            </div>
            <div className="text-sm text-[var(--foreground-muted)]">
              Добавьте друзей по юзернейму
            </div>
          </div>
        )}
      </div>

      {/* Account actions */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="h-10 px-4 text-sm rounded-xl border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors flex items-center gap-2 text-[var(--foreground-muted)]"
          >
            <LogOut size={14} /> Выйти
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Удалить весь локальный прогресс?")) reset();
            }}
            className="h-10 px-4 text-sm rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} /> Сбросить прогресс
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${
      accent
        ? "bg-gradient-to-br from-orange-50 to-amber-50/50 border-orange-200/60"
        : "bg-white border-[var(--border)]"
    }`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={13} className={accent ? "text-orange-500" : "text-[var(--foreground-soft)]"} />
        <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-muted)]">{label}</span>
      </div>
      <div className="text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}
