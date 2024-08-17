const card = ({imageLink, logo, title}:{
    imageLink: string,
    logo: string,
    title: string
}) => {
    return <div className="max-w-[23rem] max-h-full rounded-lg overflow-hidden border border-gray-200 shadow-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:border-slate-900 hover:rounded-lg hover:shadow-xl group">
        <div className="border-b border-gray-200">
            <img src={imageLink} />
        </div>
        <div>
            <div className="pt-7 px-6">
                <img src={logo} className="w-8 h-8"/>
            </div>
            <div className="text-2xl font-semibold pt-7 px-6">
                {title}
            </div>
            <div className="py-12 px-6 font-medium underline cursor-pointer flex group-hover:no-underline transition-all duration-300 ease-in-out">
                Get started 
                <div className="ml-2 group-hover:translate-x-1.5 transform transition-transform duration-300 ease-in-out">
                    {arrow()}
                </div>
            </div>
        </div>
    </div>
}

export default card;

function arrow(){
    return<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" stroke-width="2.5" stroke="currentColor" className="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>
  
}