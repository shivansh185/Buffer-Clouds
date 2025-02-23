import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-gray-100 min-h-screen py-10">
            <header className="py-16 text-center">
    <motion.h1 
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide 
                   bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
        About Us
    </motion.h1>
</header>


            <main className="container mx-auto my-12 p-12 bg-white text-gray-900 rounded-3xl shadow-2xl max-w-5xl">
                <section className="mb-12">
                    <motion.h2 
                        className="text-4xl font-semibold mb-6 text-pink-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to Buffer Cloud!
                    </motion.h2>
                    <p className="leading-relaxed text-xl">
                        At <strong>Buffer Cloud</strong>, we empower developers, students, and coding enthusiasts with a seamless online coding experience. Our platform is designed to make coding accessible, efficient, and enjoyable for everyone.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-4xl font-semibold mb-6 text-purple-600">Our Mission</h2>
                    <p className="leading-relaxed text-xl">
                        Our mission is to provide a user-friendly online compiler that allows users to write, compile, and execute code in multiple programming languages with ease. We strive to create a collaborative community where users can learn, share, and grow together.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-4xl font-semibold mb-6 text-blue-600">What We Offer</h2>
                    <ul className="space-y-6 text-xl">
                        <li className="flex items-center gap-3">
                            ✅ <strong>Multi-Language Support:</strong> Write and execute code in Python, Java, C++, JavaScript, and more.
                        </li>
                        <li className="flex items-center gap-3">
                            ⚡ <strong>Real-Time Compilation:</strong> Instant feedback to enhance learning and debugging.
                        </li>
                        <li className="flex items-center gap-3">
                            🎨 <strong>User-Friendly Interface:</strong> Intuitive design with syntax highlighting and error detection.
                        </li>
                        <li className="flex items-center gap-3">
                            🤝 <strong>Collaboration Tools:</strong> Share code, work together, and build projects with ease.
                        </li>
                        <li className="flex items-center gap-3">
                            📚 <strong>Educational Resources:</strong> Tutorials, coding challenges, and learning materials.
                        </li>
                    </ul>
                </section>

               

                <section>
                    <h2 className="text-4xl font-semibold mb-6 text-green-600">Join Us</h2>
                    <p className="leading-relaxed text-xl">
                        Whether you're a beginner or an experienced developer, <strong>Buffer Cloud</strong> is here for you. Join our community and start coding with ease!
                    </p>
                    <p className="mt-6 text-xl text-center font-semibold text-indigo-600">
                        Thank you for choosing <strong>Buffer Cloud</strong>. Happy coding! 🚀
                    </p>
                </section>
            </main>

            <footer className="py-8 text-center text-gray-200 text-lg">
                <p>&copy; {new Date().getFullYear()} Buffer Cloud. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;