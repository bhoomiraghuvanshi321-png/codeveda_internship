function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ margin: '0 5px', padding: '5px 10px' }}>
      {children}
    </button>
  );
}

export default Button;