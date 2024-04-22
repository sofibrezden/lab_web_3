import {useEffect, useState} from "react";
import "./Notes.css";
import Cookies from "js-cookie";
import plus from '../../images/plus.png'

function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

function List() {
    const [list, setList] = useState([]);
    const user_id = Cookies.get("user_id");

    const getData = async () => {
        const data = await fetch(
            "http://127.0.0.1:8000/notes/" + user_id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((data) => data.json());
        setList(JSON.parse(data.data)?.map((item) => item.fields) ?? []);
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(list);

    return (
    <>
        <div className="wrapper" id="notesContainer">
            {list.map(note => {
                const truncatedTitle = note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title;
                const truncatedContent = note.content.length > 70 ? `${note.content.substring(0, 70)}...` : note.content;

                return (
                    <div key={note.id} className="note">
                        <h3>{truncatedTitle}</h3>
                        <p>{truncatedContent}</p>
                    </div>
                );
            })}
        </div>
        <a href="http://localhost:8000/create_note/">
            <div className="plus-icon">
                <img src={plus} alt="plus icon"/>
            </div>
        </a>
    </>
);

}

export default List;
