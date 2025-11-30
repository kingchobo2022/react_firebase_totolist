import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import type { Todo } from "../types/todo";

const todosCollection = collection(db, "todos");

// 모든 todo 가져오기
export async function fetchTodos(): Promise<Todo[]> {
    const q = query(todosCollection, orderBy("createAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => (
        {
            id: d.id,
            ...(d.data() as Omit<Todo, "id">)
        }
    ))
}


export async function addToto(title: string): Promise<void> {
    // FireStore 저장 부분

    await addDoc(todosCollection, {
        title,
        completed: false,
        createdAt: Date.now()
    });
}