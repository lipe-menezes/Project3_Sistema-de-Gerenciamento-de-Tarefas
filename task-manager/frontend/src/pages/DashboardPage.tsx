import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks";
import { useAuth } from "../context/AuthContext";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "doing" | "done";
};

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [filter, setFilter] = useState<"all" | "todo" | "doing" | "done">("all");

  async function loadTasks() {
    try {
      setLoadingTasks(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch {
      toast.error("Erro ao carregar tarefas");
    } finally {
      setLoadingTasks(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateTask() {
    if (!title.trim()) {
      toast.error("Informe o título da tarefa");
      return;
    }

    try {
      setCreatingTask(true);
      const response = await createTask({ title, description });

      setTasks((prev) => [response.data, ...prev]);
      setTitle("");
      setDescription("");
      toast.success("Tarefa criada com sucesso");
    } catch {
      toast.error("Erro ao criar tarefa");
    } finally {
      setCreatingTask(false);
    }
  }

  async function handleStatusChange(id: string, status: Task["status"]) {
    const oldTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );

    try {
      await updateTask(id, { status });
      toast.success("Status atualizado");
    } catch {
      setTasks(oldTasks);
      toast.error("Erro ao atualizar status");
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Deseja excluir esta tarefa?");
    if (!confirmed) return;

    const oldTasks = [...tasks];
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await deleteTask(id);
      toast.success("Tarefa excluída");
    } catch {
      setTasks(oldTasks);
      toast.error("Erro ao excluir tarefa");
    }
  }

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 40, marginBottom: 8 }}>Dashboard</h1>
          <p>Olá, {user?.name}</p>
        </div>

        <button
          onClick={signOut}
          style={{
            background: "#111827",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
          }}
        >
          Sair
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Nova tarefa</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: 12,
            border: "1px solid #d1d5db",
            borderRadius: 8,
          }}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: 12,
            border: "1px solid #d1d5db",
            borderRadius: 8,
            minHeight: 100,
          }}
        />

        <button
          onClick={handleCreateTask}
          disabled={creatingTask}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
            opacity: creatingTask ? 0.7 : 1,
          }}
        >
          {creatingTask ? "Criando..." : "Criar tarefa"}
        </button>
      </div>

      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["all", "todo", "doing", "done"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item as "all" | "todo" | "doing" | "done")}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: filter === item ? "#111827" : "#e5e7eb",
              color: filter === item ? "#fff" : "#111827",
            }}
          >
            {item === "all" ? "Todas" : item}
          </button>
        ))}
      </div>

      <div>
        <h2 style={{ marginBottom: 16 }}>Minhas tarefas</h2>

        {loadingTasks ? (
          <p>Carregando tarefas...</p>
        ) : filteredTasks.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
          >
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ marginBottom: 8 }}>{task.title}</h3>
              <p style={{ marginBottom: 12 }}>{task.description || "Sem descrição"}</p>
              <p style={{ marginBottom: 12 }}>
                <strong>Status:</strong> {task.status}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => handleStatusChange(task.id, "todo")}
                  style={{
                    background: "#dbeafe",
                    padding: "10px 14px",
                    borderRadius: 8,
                  }}
                >
                  Todo
                </button>

                <button
                  onClick={() => handleStatusChange(task.id, "doing")}
                  style={{
                    background: "#fef3c7",
                    padding: "10px 14px",
                    borderRadius: 8,
                  }}
                >
                  Doing
                </button>

                <button
                  onClick={() => handleStatusChange(task.id, "done")}
                  style={{
                    background: "#dcfce7",
                    padding: "10px 14px",
                    borderRadius: 8,
                  }}
                >
                  Done
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    background: "#fee2e2",
                    padding: "10px 14px",
                    borderRadius: 8,
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}