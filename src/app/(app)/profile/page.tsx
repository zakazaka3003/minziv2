"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useProgress } from "@/store/progress";
import { useMounted } from "@/lib/useMounted";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Panda } from "@/components/ui/Panda";
import { StreakPill } from "@/components/ui/StreakPill";
import {
  Settings,
  Trash2,
  Award,
  Flame,
  Target,
  Clock,
  UserPlus,
  Users,
  LogOut,
  Edit3,
  Check,
  X,
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
  const { data: session, status } = useSession();
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

  if (!mounted) return null;

  const totalReviews = Object.values(chars).reduce(
    (s, c) => s + c.attempts,
    0
  );

  const displayName = profile?.name || session?.user?.name || "Гость";
  const displayAvatar = profile?.image || session?.user?.image;
  const displayUsername = profile?.username;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
      {/* Header */}
      <header className="flex items-center gap-5 mb-8">
        {displayAvatar && displayAvatar.length <= 4 ? (
          <div className="w-24 h-24 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-5xl">
            {displayAvatar}
          </div>
        ) : displayAvatar ? (
          <img
            src={displayAvatar}
            alt=""
            className="w-24 h-24 rounded-2xl object-cover"
          />
        ) : (
          <Panda mood="hello" size={96} />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--foreground-soft)] mb-1">
            Профиль
          </div>
          <h1 className="text-2xl font-display font-medium truncate">
            {displayName}
          </h1>
          {displayUsername && (
            <div className="text-sm text-[var(--green)] mt-0.5">
              @{displayUsername}
            </div>
          )}
          {profile?.bio && (
            <div className="text-sm text-[var(--foreground-muted)] mt-1 line-clamp-2">
              {profile.bio}
            </div>
          )}
          {!isLoggedIn && (
            <div className="text-sm text-[var(--foreground-muted)] mt-1">
              <Link href="/login" className="text-[var(--green)] hover:underline">
                Войдите
              </Link>
              , чтобы сохранить прогресс
            </div>
          )}
        </div>
        {isLoggedIn && !editing && (
          <button
            type="button"
            onClick={startEditing}
            className="w-10 h-10 rounded-xl bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--surface-3)] transition-colors flex-shrink-0"
          >
            <Edit3 size={16} />
          </button>
        )}
      </header>

      {/* Edit profile */}
      {editing && (
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Редактировать профиль</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[var(--foreground-muted)] mb-1.5 block">Аватар</label>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-3xl">
                  {editAvatar || "🐼"}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatars(!showAvatars)}
                  className="text-sm text-[var(--green)] hover:underline"
                >
                  Выбрать аватар
                </button>
              </div>
              {showAvatars && (
                <div className="grid grid-cols-8 gap-2 mt-3">
                  {AVATAR_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setEditAvatar(a); setShowAvatars(false); }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        editAvatar === a
                          ? "bg-[var(--green-soft)] ring-2 ring-[var(--green)]"
                          : "bg-[var(--surface-2)] hover:bg-[var(--surface-3)]"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-[var(--foreground-muted)] mb-1.5 block">Имя</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--foreground-muted)] mb-1.5 block">Юзернейм</label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="username"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--foreground-muted)] mb-1.5 block">О себе</label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={2}
                maxLength={200}
                placeholder="Расскажите о себе..."
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow resize-none"
              />
            </div>
            {saveError && (
              <div className="text-sm text-red-600">{saveError}</div>
            )}
            <div className="flex gap-2">
              <Button onClick={saveProfile} disabled={saveLoading}>
                <Check size={14} /> Сохранить
              </Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                <X size={14} /> Отмена
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stats */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Статистика</h2>
        <div className="grid grid-cols-2 gap-4">
          <Goal label="Ежедневная цель" icon={Target} value="20 иероглифов" />
          <Goal label="Ежедневное время" icon={Clock} value="20 минут" />
          <Goal label="Серия" icon={Flame} value={`${streak} дн.`} />
          <Goal label="Уроков пройдено" icon={Award} value={`${completed.length}`} />
        </div>
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          {!isLoggedIn && (
            <Link href="/login" className="btn btn-primary">
              Войти
            </Link>
          )}
          {streak > 0 && <StreakPill count={streak} />}
          <span className="text-xs text-[var(--foreground-muted)] ml-auto">
            Всего ответов: {totalReviews}
          </span>
        </div>
      </Card>

      {/* Friends */}
      {isLoggedIn && (
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users size={18} /> Друзья
            {friends.length > 0 && (
              <span className="text-sm font-normal text-[var(--foreground-muted)]">
                ({friends.length})
              </span>
            )}
          </h2>

          {/* Add friend */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              placeholder="Юзернейм друга"
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/20 focus:border-[var(--green)] transition-shadow font-mono"
              onKeyDown={(e) => e.key === "Enter" && addFriend()}
            />
            <Button onClick={addFriend} disabled={friendLoading || !friendUsername.trim()}>
              <UserPlus size={14} />
            </Button>
          </div>
          {friendError && (
            <div className="text-sm text-red-600 mb-3">{friendError}</div>
          )}

          {/* Pending requests */}
          {pending.length > 0 && (
            <div className="mb-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--foreground-soft)] mb-2">
                Входящие запросы
              </div>
              <div className="space-y-2">
                {pending.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--surface-2)]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--green-soft)] flex items-center justify-center text-sm">
                      {p.user.image && p.user.image.length <= 4 ? p.user.image : "🐼"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {p.user.name || p.user.username || "—"}
                      </div>
                      {p.user.username && (
                        <div className="text-xs text-[var(--foreground-muted)]">
                          @{p.user.username}
                        </div>
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
                      className="w-8 h-8 rounded-lg bg-[var(--surface-3)] flex items-center justify-center hover:bg-red-100"
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
            <div className="space-y-2">
              {friends.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--surface-2)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--green-soft)] flex items-center justify-center text-sm">
                    {f.image && f.image.length <= 4 ? f.image : "🐼"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {f.name || f.username || "—"}
                    </div>
                    {f.username && (
                      <div className="text-xs text-[var(--foreground-muted)]">
                        @{f.username}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-[var(--foreground-muted)] text-center py-4">
              Добавьте друзей по юзернейму, чтобы следить за прогрессом друг друга
            </div>
          )}
        </Card>
      )}

      {/* Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Settings size={16} /> Настройки
        </h2>
        {!isLoggedIn && (
          <div className="text-sm text-[var(--foreground-muted)] mb-4">
            Прогресс гостя сохраняется только на этом устройстве (localStorage).
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm("Удалить весь локальный прогресс?")) reset();
            }}
          >
            <Trash2 size={14} /> Сбросить прогресс
          </Button>
          {isLoggedIn && (
            <Button
              variant="secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut size={14} /> Выйти
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function Goal({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="card-soft p-4">
      <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-xs uppercase tracking-wider mb-2">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}
