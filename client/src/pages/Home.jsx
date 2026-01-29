import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
    <Navbar />
    <section className='p-10 text-center'>
        <h1 className='font-bold text-4xl text-slate-900'>Turn Scattered Thoughts into Powerful Ideas</h1>
        <p className="p-6 font-bold">Brainstorm, organize, and collaborate on ideas in one smart, visual workplace built for creators, students and teams.</p>
        <div className="flex gap-7 justify-center pt-2">
            <button className="bg-amber-500 p-2 rounded-lg text-white hover:bg-amber-600 cursor-pointer font-bold transition-colors">Get Started For Free</button>
            <button className='bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg cursor-pointer font-bold transition-colors'>View Demo Board</button>
        </div>
    </section>
    <section className='p-10 text-center bg-blue-950 grid-cols-1'>
        <h1 className='font-bold text-4xl text-white'>Why IdeaSpark?</h1>
        <div className='p-10 flex justify-center gap-3.5'>
            <div className='bg-amber-50 p-5 rounded'>
                <h2 className='text-3xl font-bold'>The Problems</h2>
                <ul className='p-3'>
                    <li>Ideas get lost in notes, chats, and random documents</li>
                    <li>No clear structure for brainstorming</li>
                    <li>Hard to collaborate in real-time</li>
                    <li>No easy way to turn ideas into action</li>
                </ul>
            </div>
            <div className='bg-amber-50 p-5 rounded'>
                <h2 className='text-3xl font-bold'>The Solutions</h2>
                <ul className='p-3'>
                    <li>🧩 Visualization using Brainstorming Boards made possible</li>
                    <li>👥 Real-Time Team Collaboration has been enabled</li>
                    <li>🏷️ Tags, Categories & Priority Labels for each idea</li>
                    <li>📌 Convert Ideas into Tasks</li>
                </ul>
            </div>
        </div>
    </section>
    <section className="p-10 text-center">
        <h2 className='text-3xl font-bold p-4'>What You Can Do with IdeaSpark</h2>
        <div className='p-6 text-2xl'>
            <p className='p-2'>🧠 <span className='font-bold'>Smart Brainstorming</span> - Create boards to visually map your ideas and connect related thoughts.</p>
            <p className='p-2'>👥 <span className='font-bold'>Team Collaboration</span> - Invite teammates, build together in real time.</p>
            <p className='p-2'>🏷️ <span className='font-bold'>Categorization</span> - Organize ideas by categories.</p>
        </div>
    </section>
    <section className='bg-blue-950 p-10'>
        <h2 className='text-center text-3xl text-white font-bold pb-4'>How IdeaSpark Works</h2>
        <div className='bg-amber-200 p-1 pb-2 rounded'>
            <p className='text-center text-2xl p-2'><span className="font-bold">1️⃣ Create a Board</span> - Start a new brainstorming board for your project or topic.</p>
            <p className='text-center text-2xl p-2'><span className="font-bold">2️⃣ Add Ideas</span> - Drop in thoughts, notes, or suggestions as cards.</p>
            <p className='text-center text-2xl p-2'><span className="font-bold">3️⃣ Organize & Tag</span> - Group ideas, add labels, and prioritize.</p>
            <p className='text-center text-2xl p-2'><span className="font-bold">4️⃣ Collaborate & Execute</span> - Share with your team and turn ideas into action.</p>
        </div>
    </section>
    <section className='text-center p-5 pb-10'>
        <h2 className='text-3xl font-bold p-4'>Who is IdeaSpark For?</h2>
        <div className='bg-blue-200 rounded p-3'>
            <p className='text-2xl p-2'>👨‍💻<span className='font-bold'>Students</span> - Organize project ideas, hackathon concepts, and study plans in one visual workspace.</p>
            <p className='text-2xl p-2'>🚀<span className='font-bold'>Startup Founders</span> - Brainstorm product features, validate ideas, and map MVP workflows quickly.</p>
            <p className='text-2xl p-2'>🎨<span className='font-bold'>Designers & Creators</span> - Organize project ideas, hackathon concepts, and study plans in one visual workspace.</p>
            <p className='text-2xl p-2'>👥<span className='font-bold'>Teams</span> - Collaborate in real time, leave comments, and turn discussions into action plans.</p>
        </div>
    </section>
    <Footer />
    </>
  )
}

export default Home