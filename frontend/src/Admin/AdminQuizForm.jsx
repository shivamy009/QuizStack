import React, { useState } from 'react';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { usequi } from '';
import { useQuizStore } from '../store/useQuizStore';
import uploadImage from '../utils/ImageUploader';

const Adminquizform = () => {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        numberofQuestions: 0,
        questions: [],
        startTime: '',
        duration: '',
    });
    const navigate=useNavigate();
    const { createQuiz } = useQuizStore();
    const handleChange = (e) => {
        setQuizData({ ...quizData, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index][field] = value;
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    // const handleImageUpload = (index, file) => {
    //     const updatedQuestions = [...quizData.questions];
    //     const imagurl = uploadImage(file);
    //     console.log(imagurl);

    //     updatedQuestions[index].questionimage = imagurl;
    //     setQuizData({ ...quizData, questions: updatedQuestions });
    // };
    
    const handleImageUpload = (index, file) => {
        const updatedQuestions = [...quizData.questions];
        uploadImage(file).then((imageUrl) => {
            // console.log("Resolved Image URL:", imageUrl);
                updatedQuestions[index].questionimage = imageUrl;
                setQuizData({ ...quizData, questions: updatedQuestions });
            // setQuizData((prev) => ({ ...prev, questionImage: imageUrl }));
        }).catch((error) => {
            console.error("Error uploading image:", error);
        });
    };

    

    const handleFileUpload = (file) => {
        uploadImage(file).then((imageUrl) => {
            console.log("Resolved Image URL:", imageUrl);
            setQuizData((prev) => ({ ...prev, questionImage: imageUrl }));
        }).catch((error) => {
            console.error("Error uploading image:", error);
        });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                { question: '', options: ['', '', '', ''], correctAnswer: '' },
            ],
        });
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const formData = new FormData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(quizData,"tyi")
            formData.append('title', quizData.title);
            console.log("first")
            formData.append('description', quizData.description);
            formData.append('numberofQuestions', quizData.numberofQuestions);
            formData.append('startTime', quizData.startTime);
            formData.append('duration', quizData.duration);

            quizData.questions.forEach((q, index) => {
                formData.append(`questions[${index}][question]`, q.question);
                formData.append(`questions[${index}][options]`, JSON.stringify(q.options));
                formData.append(`questions[${index}][correctAnswer]`, q.correctAnswer);
                if (q.image instanceof File) {
                //    let url= uploadImage(q.image)
                    formData.append(`questions[${index}][questionimage]`, q.image); // Ensure image is a valid file object
                }
            });

            // await axios.post('/api/quizzes', formData, {
            //     headers: { 'Content-Type': 'multipart/form-data' },
            // });
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            // console.log(formData[questions][0])
            createQuiz(quizData,navigate);
            // alert('Quiz created successfully!');
        } catch (error) {
            console.log(error)
            toast.error('Error creating quiz');
            // alert('Error creating quiz');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a Quiz</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Quiz Details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Quiz Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter quiz title"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Description</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter quiz description"
                            className="textarea textarea-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Number of Questions</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            name="numberofQuestions"
                            placeholder="Enter number of questions"
                            className="input input-bordered w-full"
                            onChange={(e) => setQuizData({ ...quizData, numberofQuestions: Number(e.target.value) })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Start Time</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Duration (minutes)</span>
                        </label>
                        <input
                            type="Number"
                            name="duration"
                            placeholder="Enter duration"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                        {quizData.questions.map((q, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 border rounded-lg relative"
                            >
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                                    onClick={() => deleteQuestion(index)}
                                >
                                    ✕
                                </button>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">
                                            Question {index + 1}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter question"
                                        className="input input-bordered w-full"
                                        value={q.question}
                                        onChange={(e) =>
                                            handleQuestionChange(index, 'question', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {q.options.map((opt, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            placeholder={`Option ${i + 1}`}
                                            className="input input-bordered w-full"
                                            value={opt}
                                            onChange={(e) => {
                                                const updatedOptions = [...q.options];
                                                updatedOptions[i] = e.target.value;
                                                handleQuestionChange(index, 'options', updatedOptions);
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text font-medium">Correct Answer</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter correct answer"
                                        className="input input-bordered w-full"
                                        value={q.correctAnswer}
                                        onChange={(e) =>
                                            handleQuestionChange(index, 'correctAnswer', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text font-medium">Upload Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e) =>
                                            handleImageUpload(index, e.target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Question and Submit */}
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="btn btn-outline btn-primary w-full"
                    >
                        Add Question
                    </button>
                    <button type="submit" className="btn btn-primary w-full">
                        Create Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Adminquizform;
