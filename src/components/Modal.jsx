function Modal({ type, closeModal }) {
  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">

        {/* TITLE */}
        <h2>{type === "login" ? "Login" : "Signup"}</h2>

        {/* FORM */}
        {type === "signup" && (
          <input type="text" placeholder="Full Name" />
        )}

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={closeModal}>
          {type === "login" ? "Login" : "Signup"}
        </button>

      </div>
    </div>
  );
}

export default Modal;