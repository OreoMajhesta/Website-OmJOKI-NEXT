import { useState } from 'react';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        rating: 1,
        comment: '',
        image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData({
            ...formData,
            image: file || null,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submit logic here
    };

    return (
        <section className="py-20 mt-20">
            <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Feedback Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Rating Input */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating (1-10, with 0.5 increments)
                        </label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full h-10 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            {Array.from({ length: 20 }, (_, i) => (
                                <option key={i + 1} value={(i + 1) / 2}>
                                    {(i + 1) / 2}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comment Input */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your comment"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default FeedbackForm;
