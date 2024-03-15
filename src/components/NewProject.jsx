import { useRef } from 'react';
import Input from './Input.jsx'
import Modal from './Modal.jsx';

export default function NewProject({onAdd, onCancel}){
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const date = useRef();

    function handleSave(){
        const enteredTitle= title.current.value;
        const enteredDescritpion = description.current.value;
        const enteredDate = date.current.value;

        if(enteredTitle.trim() === '' || enteredDescritpion.trim() === '' || enteredDate.trim() === ''){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescritpion,
            date: enteredDate,
        });
    }

    return (
        <>
        <Modal ref={modal} buttonCaption='Okay'>
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Oops...looks like you forgot to enter a value.</p>
            <p className='text-stone-600 mb-4'>Please enter a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button onClick= {onCancel}className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
            </menu>
            <div>
                <Input ref={title}type="text" label="Title"/>
                <Input ref={description} label="Description" textarea className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"/>
                <Input ref={date} type="date" label="Due Date" className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"/>
            </div>
            </div>
            </>
    );
}