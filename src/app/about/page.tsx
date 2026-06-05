import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <>
        <div className="p-4 rounded-md">
            <h2 className="text-2xl text-center font-bold my-6">The Team</h2>
            <div className="flex flex-wrap justify-center">
                <div className="mx-4 w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/148284559"
                        alt="Saeed's Github profile picture"
                        width={288}
                        height={288}
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Saeed Esparza</h3>
                    <p>&emsp;</p>
                </div>
                <div className="mx-4 w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/182562541"
                        alt="Raiden's Github profile picture"
                        width={288}
                        height={288}
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Raiden Hiland</h3>
                    <p>
                        &emsp;Hello! I'm Raiden, one of the developers
                        of this site. Specifically, I built the carousels
                        you can see on the homepage, the navbar up top,
                        added the show pages from Riley's work,
                        implemented the authentication hook-in, and a few
                        other little things across the project!
                    </p>
                </div>
                <div className="mx-4 w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/209155346?v=4"
                        alt="Riley's Github profile picture"
                        width={288}
                        height={288}
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Riley Hopper</h3>
                    <p>&emsp;</p>
                </div>
            </div>
            <hr className="my-6" />
            <h2 className="text-2xl text-center font-bold my-4">The Project</h2>
            <p>
                &emsp;This project was made for the TCSS460 course
                (Client/Server Programming) at the University of
                Washington. It's part two of the course, the first part of
                which was implementing a backend like the one this site is
                built on (though not the one this site is built on, we
                swapped with another team).
            </p>
            <hr className="my-6" />
            <h2 className="text-2xl text-center font-bold my-4">Credits</h2>
            <ul className="text-center">
                <li>
                    <Link href="https://www.flaticon.com/authors/smashingstocks" className="text-link">smashingstocks </Link>
                    for our site's favicon.
                </li>
                <li>
                    <Link href="https://fontawesome.com/" className="text-link">FontAwesome </Link>
                    for the rest of the icons on the site.
                </li>
            </ul>
        </div>
        </>
    );
}