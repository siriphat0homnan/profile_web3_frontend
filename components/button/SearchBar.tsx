import Router from 'next/router'
import {getInfo} from '../../pages/api/web3Init'
import { AiOutlineSearch, AiFillFilePdf, AiOutlineReload} from "react-icons/ai";

import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image';



const SearchBar: React.FC = () => {

    interface FormElements extends HTMLFormControlsCollection {
        address: HTMLInputElement
    }
    
    interface AddressElement extends HTMLFormElement {
       readonly elements: FormElements
    }

    const redirect = (event: React.FormEvent<AddressElement>) => {
        event.preventDefault()
        let address = event.currentTarget.elements.address.value
        getInfo(address).then(() => {
            Router.push('/profile/' + address)
        })
    }

    const printDocument = () => {
        const print = document.getElementById('print')!;
        htmlToImage.toPng(print, { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
        //   const imgProps= pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.width;
          const pdfHeight = pdf.internal.pageSize.height;
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save("download.pdf"); 
        });
    }

    const refresh = () => {
        window.location.reload()
    }

return (
    <div className='dark:bg-gray-700 flex content-center items-center justify-center'>
        <form className="flex md:w-1/2 w-full text-center" onSubmit={redirect}>   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className=" relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <AiOutlineSearch></AiOutlineSearch>
                </div>
                <input type="text" name="address" className="dark:bg-gray-700 dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Address" />
            </div>
            <button type="submit" className="dark:bg-gray-700 bg-white  p-2.5 ml-2 text-sm font-medium text-white  rounded-lg border border-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600  hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <AiOutlineSearch className='dark:text-white text-gray-700 '></AiOutlineSearch>
                <span className="sr-only">Search</span>
            </button>

            <button onClick={printDocument} className="dark:bg-gray-700 bg-white  p-2.5 ml-2 text-sm font-medium text-white  rounded-lg border border-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600  hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <AiFillFilePdf className='dark:text-white text-gray-700 '></AiFillFilePdf>
                <span className="sr-only">Export PDF</span>
            </button>
            <button onClick={refresh} className="dark:bg-gray-700 bg-white  p-2.5 ml-2 text-sm font-medium text-white  rounded-lg border border-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600  hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <AiOutlineReload className='dark:text-white text-gray-700 '></AiOutlineReload>
            </button>
        </form>
    </div>
  );
}

export default SearchBar;