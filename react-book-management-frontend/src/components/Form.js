
import "./Form.css"
import { useEffect, useState } from "react";

const Form = ({ currentbook, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        issueDate: '',
    });

    useEffect(() => {
        if (currentbook) {
            setFormData({
                title: currentbook.title,
                author: currentbook.author,
                price: currentbook.price,
                issueDate: currentbook.issueDate,
            })
        } else {
            setFormData({
                title: '',
                author: '',
                price: '',
                issueDate: ''
            });
        };
    }, [currentbook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
        console.log(formData);
    }

    const handleBookChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="author">Author: </label>
                <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="issueDate">Issue Date: </label>
                <input
                    className="form-control"
                    name="issueDate"
                    placeholder="MM-DD-YYYY"
                    value={formData.issueDate}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price: </label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                    placeholder="$10.10"
                    value={formData.price}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div>
                <button className="form-control btn submit" type="submit">{currentbook ? "Update" : "Add"}</button>
            </div>
        </form>
    )
}

export default Form;