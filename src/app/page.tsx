'use client'
import { useState } from "react";
import Login from "./Login/page";
import Register from "./Register/page";


export default function Home() {
  const [name, setName] = useState<boolean>(true);
  return (
    <div>
      {name ? <Login setName={setName}/> : <Register setName={setName}/>}
    </div>
  );
}
