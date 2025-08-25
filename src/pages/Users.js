import { useEffect, useState } from "react";
import api from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setUsers(data);
    } catch (error) {
      console.error("Fetch Users Error:", error.response?.data || error.message);
      alert("Failed to fetch users: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      if (!form.firstname || !form.lastname || !form.email) {
        alert("Please fill all fields");
        return;
      }

      // ✅ FIX: use lowercase "users"
      await api.put(`/auth/users/${id}`, form);

      alert("User updated successfully!");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      alert("Failed to update user: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Users</h1>
      <div style={styles.grid}>
        {users.map((u) => (
          <div key={u._id} style={styles.card}>
            {editingUser === u._id ? (
              <>
                <input
                  style={styles.input}
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                />
                <input
                  style={styles.input}
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                />
                <input
                  style={styles.input}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <button
                  style={styles.button}
                  onClick={() => handleUpdate(u._id)}
                  onMouseEnter={(e) => (e.target.style.background = "gray")}
                  onMouseLeave={(e) => (e.target.style.background = "black")}
                >
                  Save
                </button>

                <button
                  style={styles.button}
                  onClick={() => setEditingUser(null)}
                  onMouseEnter={(e) => (e.target.style.background = "gray")}
                  onMouseLeave={(e) => (e.target.style.background = "black")}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div style={styles.row}>
                  <h3 style={styles.name}>
                    {u.firstname} {u.lastname}
                  </h3>
                  <button
                    style={styles.button}
                    onClick={() => handleEdit(u)}
                    onMouseEnter={(e) => (e.target.style.background = "gray")}
                    onMouseLeave={(e) => (e.target.style.background = "black")}
                  >
                    Edit
                  </button>
                </div>
                <p style={styles.email}>{u.email}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/07/97/05/76/1000_F_797057688_gttxjAGEp7QPiq389hTm7OH0PAtm8JP5.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "white",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
    transition: "transform 0.2s ease-in-out",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    margin: 0,
    fontSize: "18px",
    color: "#222",
  },
  email: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#666",
    wordBreak: "break-word",
  },
  input: {
    padding: "8px",
    margin: "4px 0",
    width: "95%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    marginLeft: "10px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    background: "black",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
};
