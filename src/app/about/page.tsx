import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <>
        <div>
            <h2 className="text-2xl text-center font-bold my-6">The Team (Group 9)</h2>
            <div className="flex flex-wrap flex-col items-center lg:items-start lg:flex-row justify-center">
                <div className="m-4 w-3/4 lg:w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/148284559"
                        alt="Saeed's Github profile picture"
                        width={288}
                        height={288}
                        loading="eager"
                        className="mx-auto"
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Saeed Esparza</h3>
                    <p>
                        &emsp;
                    </p>
                </div>
                <div className="m-4 w-3/4 lg:w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/182562541"
                        alt="Raiden's Github profile picture"
                        width={288}
                        height={288}
                        loading="eager"
                        className="mx-auto"
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Raiden Hiland</h3>
                    <p>
                        &emsp;Hello! I'm Raiden, one of the developers of this site. On the
                        frontend, I handled the shows pages, auth, along with much of the
                        accessibility and styling. On the backend, I worked on implementing
                        authn/authz, built several of the API endpoints (search, reviews),
                        and worked to maintain code quality and DX throughout. On both sides,
                        I did much of the the project management, breaking up user stories
                        into tasks and making sure the team was on track.
                    </p>
                </div>
                <div className="m-4 w-3/4 lg:w-72">
                    <Image
                        src="https://avatars.githubusercontent.com/u/209155346?v=4"
                        alt="Riley's Github profile picture"
                        width={288}
                        height={288}
                        loading="eager"
                        className="mx-auto"
                    />
                    <h3 className="text-lg text-center font-bold mt-2 mb-1">Riley Hopper</h3>
                    <p>
                        &emsp;Hi, I'm Riley, one of the developers on this site. On the
                        front end, I built out the search, details, and popular pages.
                        On the back end, I worked primarily on implementing the API
                        endpoints. Honestly, almost everything in this course was new to
                        me. Over the two parts I picked up building endpoints,
                        authentication, hosting, React, and a lot more along the way.
                    </p>
                </div>
            </div>
            <hr className="my-6" />
            <h2 className="text-2xl text-center font-bold my-4">The Project</h2>
            <p>
                &emsp;This project was made for the TCSS460 course (Client/Server Programming)
                at the University of Washington. It's part two of the course, the first part
                of which was implementing a backend like the one this site is built on (though
                not the one this site is built on, we swapped with another team). We passed our
                backend off to Group 1, and our backend partners were Group 8, who built the API
                we use to browse, search, rate, and review media. That API proxies the TMDB API,
                which is where all our data comes from at the top. Our authentication is built on
                an OAuth2 service provided for this course, Auth<sup>2</sup>, and during
                development we used the companion tool for generating authentication tokens to test
                on our own backend API.
            </p>
            <p className="text-center font-bold text-lg my-3">
                <Link href="https://github.com/UWT-TCSS460-SP26/group-project-frontend-public-group-9" className="text-link hover:underline">Frontend Source</Link>&emsp; | &emsp;<Link href="https://github.com/UWT-TCSS460-SP26/group-project-backend-group-8" className="text-link hover:underline">Backend Source</Link>
            </p>
            <hr className="my-6" />
            <h2 className="text-2xl text-center font-bold my-4">Credits</h2>
            <ul className="text-center">
                <li>
                    <Link href="https://tcss460-team-8-api.onrender.com/api-docs" className="text-link hover:underline">Group 8</Link>&nbsp;
                    for our backend API.
                </li>
                <li>
                    <Link href="https://tcss-460-iam.onrender.com/" className="text-link hover:underline">Auth<sup>2</sup></Link>&nbsp;
                    as our OAuth2 authentication service.
                </li>
                <li>
                    <Link href="https://www.themoviedb.org/" className="text-link hover:underline">TMDB</Link>&nbsp;
                    for all the media metadata.
                </li>
                <li>
                    <Link href="https://www.flaticon.com/authors/smashingstocks" className="text-link hover:underline">smashingstocks</Link>&nbsp;
                    for our site's favicon.
                </li>
                <li>
                    <Link href="https://fontawesome.com/" className="text-link hover:underline">FontAwesome</Link>&nbsp;
                    for the rest of the icons on the site.
                </li>
            </ul>
        </div>
        </>
    );
}