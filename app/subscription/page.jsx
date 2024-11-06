import React from "react";
import { PinnedLinks } from "../shop/page";

function Media() {
	return (
		<div className="flex flex-col items-center justify-center gap-12 p-4 mt-14 sm:p-10">
			<h1 className="w-full max-w-screen-xl text-5xl text-left">Media</h1>
			{/* <PinnedLinks /> */}

			<div className="flex flex-col max-w-screen-xl gap-12">
				<MediaHero />
				<MediaGrid />
			</div>
		</div>
	);
}

function MediaHero() {
	return (
		<div className="flex flex-col gap-12 md:flex-row">
			<div className="md:w-2/3">
				<FeaturedVideoCard />
			</div>
			<div className="flex flex-col justify-between gap-4 md:w-1/3">
				<RecentAudioCard />
				<RecentAudioCard />
				<RecentAudioCard />
				<RecentAudioCard />
				<RecentAudioCard />
			</div>
		</div>
	);
}

function MediaGrid() {
	return (
		<div className="grid max-w-screen-xl grid-cols-1 gap-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">
			<VideoCard />
			<AudioCard />
			<VideoCard />
			<ImageCard />
			<AudioCard />
			<AudioCard />
			<ImageCard />
			<ImageCard />
			<VideoCard />
		</div>
	);
}

function FeaturedVideoCard() {
	return (
		<div className="flex flex-col gap-4 p-4 overflow-hidden transition-all duration-200 hover:bg-white hover:scale-105 ring-1 ring-neutral-300 hover:ring-primary hover:shadow hover:shadow-primary hover:cursor-pointer">
			<div className="relative pt-[56.25%]">
				<iframe
					className="absolute inset-0 w-full h-full"
					src="https://www.youtube.com/embed/dQw4w9WgXcQ"
					frameBorder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen
				></iframe>
			</div>
			<div className="flex flex-col gap-2 px-2">
				<p className="text-base text-accent">Featured Video</p>
				<h2 className="text-lg font-bold text-neutral-600">
					Amazing Video Title
				</h2>
				<p className="text-base text-neutral-500 line-clamp-2">
					This is a brief description of the featured video content.
				</p>
			</div>
		</div>
	);
}

function RecentAudioCard() {
	return (
		<div className="flex gap-4 p-4 transition-all duration-200 text-neutral-600 ring-1 ring-neutral-300 hover:bg-white hover:text-primary hover:ring-primary hover:scale-105 hover:cursor-pointer">
			<div className="flex items-center justify-center p-2 bg-blue-100 text-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
					/>
				</svg>
			</div>
			<div>
				<h2 className="text-lg font-semibold line-clamp-2">
					Recent Audio Title
				</h2>
				<p className="text-sm text-accent">Duration: 15:30</p>
			</div>
		</div>
	);
}

function VideoCard() {
	return (
		<div className="flex flex-col gap-4 p-4 overflow-hidden transition-all duration-200 hover:bg-white hover:scale-105 ring-1 ring-neutral-300 hover:ring-primary hover:shadow hover:shadow-primary hover:cursor-pointer">
			<div className="relative pt-[56.25%]">
				<iframe
					className="absolute inset-0 w-full h-full"
					src="https://www.youtube.com/embed/dQw4w9WgXcQ"
					frameBorder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen
				></iframe>
			</div>
			<div className="flex flex-col gap-2 px-2">
				<h2 className="text-lg font-bold text-neutral-600">Video Title</h2>
				<p className="text-base text-neutral-500 line-clamp-2">
					Brief description of the video content.
				</p>
			</div>
		</div>
	);
}

function AudioCard() {
	return (
		<div className="flex flex-col gap-4 p-4 overflow-hidden transition-all duration-200 hover:bg-white hover:scale-105 ring-1 ring-neutral-300 hover:ring-primary hover:shadow hover:shadow-primary hover:cursor-pointer">
			<div className="flex items-center justify-center p-4 bg-blue-100 h-2/3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-12 h-12 text-primary"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
					/>
				</svg>
			</div>
			<div className="flex flex-col gap-2 px-2">
				<h2 className="text-lg font-bold text-neutral-600">Audio Title</h2>
				<p className="text-base text-neutral-500 line-clamp-2">
					Brief description of the audio content.
				</p>
				<p className="text-sm text-accent">Duration: 10:15</p>
			</div>
		</div>
	);
}

function ImageCard() {
	return (
		<div className="flex flex-col gap-4 p-4 overflow-hidden transition-all duration-200 hover:bg-white hover:scale-105 ring-1 ring-neutral-300 hover:ring-primary hover:shadow hover:shadow-primary hover:cursor-pointer">
			<img
				className="object-cover w-full h-48"
				src="https://picsum.photos/400/300"
				alt="Random Image"
			/>
			<div className="flex flex-col gap-2 px-2">
				<h2 className="text-lg font-bold text-neutral-600">Image Title</h2>
				<p className="text-base text-neutral-500 line-clamp-2">
					Brief description of the image.
				</p>
			</div>
		</div>
	);
}

export default Media;
