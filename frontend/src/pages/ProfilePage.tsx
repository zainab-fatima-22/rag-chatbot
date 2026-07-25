import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">My Profile</h1>
      <div className="bg-white shadow rounded-xl p-6 space-y-3">
        <div>
          <p className="text-xs text-slate-400">Name</p>
          <p className="text-slate-800 font-medium">{user?.name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Email</p>
          <p className="text-slate-800 font-medium">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Role</p>
          <p className="text-slate-800 font-medium capitalize">{user?.role}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Filing details, saved queries, and history will appear here in a later module.
      </p>
    </div>
  );
}
