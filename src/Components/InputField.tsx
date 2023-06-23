interface PropToDo {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    submitHandler: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, submitHandler }: PropToDo) => {
    return (
        <form onSubmit={submitHandler}>
            <div className='d-flex justify-content-between p-1' style={{ width: "60rem" }}>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Enter Todo here...'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)} />
                <button className='btn btn-outline-primary ms-2' type="submit"> Submit</button>
            </div>
        </form>
    )
}

export default InputField