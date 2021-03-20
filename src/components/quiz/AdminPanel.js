import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function AdminPanel() {   

    const [list, setList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/api/saveResults").then((response) => {
            setList(response.data.infos);
        })
    }, []);

    function deleteHandler (username) {
        Axios.delete(`http://localhost:4000/api/saveResults/${username}`);
    }

    return (
        <div>
            <h1>Students and Scores</h1>
            <table>
                <tr>
                    <th>Fullname</th>
                    <th>Score</th> 
                    <th>Num of questions</th>
                    <th>Num of ans. ques.</th>
                    <th>Correct ans.</th>
                    <th>Wrong ans.</th>
                    <th>Delete</th>
                </tr>
                {list.map((l) => {
                    return (
                        <tr>
                            <td>{l.username}</td>
                            <td>{l.score}%</td>
                            <td>{l.numberOfQuestions}</td>
                            <td>{l.numberOfAnsweredQuestions}</td>
                            <td>{l.correctAnswers}</td>
                            <td>{l.wrongAnswers}</td>
                            <td><button onClick={() => {deleteHandler(l.username)}}>delete</button></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
};

export default AdminPanel;