import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='container w-full bg-white border py-10 px-24 mt-12 flex flex-col md:flex-row items-start justify-center gap-52'>
        <div className='flex-col gap-12'>
          <h1 className='text-xl font-bold text-gray-500'>Products</h1>
          <ul className='mt-5 text-base text-gray-400'>
            <li className='mb-1'><a href="#">Flutter</a></li>
            <li className='mb-1'><a href="#">React</a></li>
            <li className='mb-1'><a href="#">Android</a></li>
            <li className='mb-1'><a href="#">iOS</a></li>
          </ul>
        </div>
        <div className='flex-col gap-12'>
          <h1 className='text-xl font-bold text-gray-500'>Design to Code</h1>
          <ul className='mt-5 text-base text-gray-400'>
            <li className='mb-1'><a href="#">Figma Plugins</a></li>
            <li className='mb-1'><a href="#">Template</a></li>
          </ul>
        </div>
        <div className='flex-col gap-12'>
          <h1 className='text-xl font-bold text-gray-500'>Comparison</h1>
          <ul className='mt-5 text-base text-gray-400'>
            <li className='mb-1'><a href="#">Flutter vs React Native</a></li>
            <li className='mb-1'><a href="#">Flutter vs Xamarin</a></li>
            <li className='mb-1'><a href="#">React vs Angular</a></li>
            <li className='mb-1'><a href="#">iOS vs Android Development</a></li>
            <li className='mb-1'><a href="#">Cross-platform vs Native Development</a></li>
            <li className='mb-1'><a href="#">Web Development Frameworks Comparison</a></li>
          </ul>
        </div>
        <div className='flex-col gap-12'>
          <h1 className='text-xl font-bold text-gray-500'>Company</h1>
          <ul className='mt-5 text-base text-gray-400'>
            <li className='mb-1'><a href="/about">About Us</a></li>
            <li className='mb-1'><a href="/contact">Contact Us</a></li>
            <li className='mb-1'><a href="#">Career</a></li>
            <li className='mb-1'><a href="#">Terms of Service</a></li>
            <li className='mb-1'><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <footer className='bg-white flex gap-16 w-full items-center justify-between px-5 py-2'>
        <h2 className="text-2xl font-bold">Blog<span className="text-blue-500">App</span></h2>

        <div className='font-base text-gray-600'>
          &copy;Made by TaralShah
        </div>

        <div>
          <ul className='flex gap-2 text-gray-700' >
            <li style={{ fontSize: "25px" }}><a href="https://www.github.com/taralshah09" target='_blank' ><i className="fa-brands fa-github"></i></a></li>
            <li style={{ fontSize: "25px" }}><a href="https://www.linkedin.com/in/taralshah9" target='_blank'><i className="fa-brands fa-linkedin"></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
