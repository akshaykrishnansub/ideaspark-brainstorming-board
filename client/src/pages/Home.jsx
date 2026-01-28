import React from 'react'

const Home = () => {
  return (
    <>
    <section className='p-10 text-center'>
        <h1 className='font-bold text-4xl text-slate-900'>Turn Scattered Thoughts into Powerful Ideas</h1>
        <p className="p-6 font-bold">Brainstorm, organize, and collaborate on ideas in one smart, visual workplace built for creators, students and teams.</p>
        <div className="flex gap-7 justify-center pt-2">
            <button className="bg-amber-500 p-2 rounded-lg text-white hover:bg-amber-600 cursor-pointer font-bold transition-colors">Get Started For Free</button>
            <button className='bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg cursor-pointer font-bold transition-colors'>View Demo Board</button>
        </div>
    </section>
    <section className='p-10 text-center bg-blue-950'>
        <h1 className='font-bold text-4xl text-white'>Why IdeaSpark?</h1>
        <div className='p-10 flex justify-center gap-3.5'>
            <div className='bg-amber-50 p-5 rounded'>
                <h1 className='text-3xl font-bold'>The Problems</h1>
                <ul className='p-3'>
                    <li>Ideas get lost in notes, chats, and random documents</li>
                    <li>No clear structure for brainstorming</li>
                    <li>Hard to collaborate in real-time</li>
                    <li>No easy way to turn ideas into action</li>
                </ul>
            </div>
            <div className='bg-amber-50 p-5 rounded'>
                <h1 className='text-3xl font-bold'>The Solutions</h1>
                <ul className='p-3'>
                    <li>🧩 Visualization using Brainstorming Boards made possible</li>
                    <li>👥 Real-Time Team Collaboration has been enabled</li>
                    <li>🏷️ Tags, Categories & Priority Labels for each idea</li>
                    <li>📌 Convert Ideas into Tasks</li>
                </ul>
            </div>
        </div>
    </section>
    <section>

    </section>
    </>
  )
}

export default Home