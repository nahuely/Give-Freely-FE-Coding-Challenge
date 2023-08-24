export default function Container({ children }) {
  return (
    <div className="p-2" style={{ width: "200px", minHeight: "200px" }}>
      {children}
    </div>
  )
}
