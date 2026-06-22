import { useState } from "react";

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [role, setRole] = useState(user.role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <label className="block text-sm mb-2">Role</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer">Cancel</button>
          <button 
            onClick={() => onSave( role )} 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal