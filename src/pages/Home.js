export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const name = user ? user.firstname : "User";

    return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Hello, {name} 
        </h1>
        <p style={styles.text}>You are successfully logged in.</p>
        <img
          src="https://www.desicomments.com/wp-content/uploads/2022/03/welcome-message-600x540.jpg"
          alt="Welcome"
          style={styles.image}
        />
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: "url('https://images.pexels.com/photos/4040585/pexels-photo-4040585.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4040585.jpg&fm=jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",        // responsive
    maxWidth: "600px",    // fixed max size
  },
  title: {
    marginBottom: "15px",
    color: "#02046bff",
  },
  text: {
    color: "#555",
    fontSize: "18px",
  },
};
