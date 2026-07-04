import "./globals.css";
import { ToastContainer } from "react-toastify";
import { TodoProvider } from "@/context/TodoContext";



export const metadata = {
  title: "My Todo App",
  description: "Created by Aditya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TodoProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}
