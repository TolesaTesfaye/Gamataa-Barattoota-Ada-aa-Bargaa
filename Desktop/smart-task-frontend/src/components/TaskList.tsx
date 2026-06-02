"use client";

import { Task } from "@/services/tasks";
import { deleteTask } from "@/services/tasks";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  showUser?: boolean;
};

export default function TaskList({ tasks, onEdit, onDelete, showUser }: Props) {
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setDeletingId(id);
      try {
        await deleteTask(id);
        onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-800 border-green-300";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 border-red-300";
      case "MEDIUM":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="mt-4 text-gray-500 text-lg">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-gray-900 flex-1 break-words">
              {task.title}
            </h3>
            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
              #{task.id}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                task.status
              )}`}
            >
              {task.status === "IN_PROGRESS" ? "In Progress" : task.status}
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {task.dueDate && (
            <p className="text-xs text-gray-500 mb-3">
              📅 Due: {new Date(task.dueDate).toLocaleDateString()} at{" "}
              {new Date(task.dueDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

          {showUser && user?.role === "ADMIN" && task.user && (
            <p className="text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded">
              👤 {task.user.name} ({task.user.email})
            </p>
          )}

          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <button
              onClick={() => onEdit(task)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              disabled={deletingId === task.id}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white text-sm font-medium py-2 px-3 rounded transition"
            >
              {deletingId === task.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
