import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-blue-950 text-white px-10 pb-14'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 p-2'>
            <div>
                <h4 className='font-bold mb-3'>Company</h4>
                <ul className='space-y-2 text-gray-300'>
                    <li className='hover:text-amber-400 cursor-pointer'>News and Press Release</li>
                    <li className='hover:text-amber-400 cursor-pointer'>About Us</li>
                    <li className='hover:text-amber-400 cursor-pointer'>FAQ</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Careers</li>
                </ul>
            </div>
            <div>
                <h4 className='font-bold mb-3'>Product</h4>
                <ul className='space-y-2 text-gray-300'>
                    <li className='hover:text-amber-400 cursor-pointer'>Features</li>
                    <li className='hover:text-amber-400 cursor-pointer'>How it works</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Demo Board</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Pricing</li>
                </ul>
            </div>
            <div>
                <h4 className='font-bold mb-3'>Resources</h4>
                <ul className='space-y-2 text-gray-300'>
                    <li className='hover:text-amber-400 cursor-pointer'>Help Center</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Documentation</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Privacy Policy</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Terms of Service</li>
                </ul>
            </div>
            <div>
                <h4 className='font-bold mb-3'>Connect</h4>
                <ul className='space-y-2 text-gray-300'>
                    <li className='hover:text-amber-400 cursor-pointer'>GitHub</li>
                    <li className='hover:text-amber-400 cursor-pointer'>LinkedIn</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Portfolio</li>
                    <li className='hover:text-amber-400 cursor-pointer'>Contact</li>
                </ul>
            </div>
        </div>
        <div className='pt-6 text-center border-blue-800'>
            © {new Date().getFullYear()} IdeaSpark. Built by Akshay Krishnan
        </div>
    </footer>
  )
}

export default Footer