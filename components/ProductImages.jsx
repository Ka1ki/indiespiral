import React, { useState } from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	PlyrLayout,
	plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

function ProductMediaCarousel({ media }) {
	const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

	const handleThumbnailClick = (index) => {
		setCurrentMediaIndex(index);
	};

	const renderMedia = (item) => {
		if (!item) {
			return (
				<div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
					No media available
				</div>
			);
		}

		if (item.type === "youtube") {
			return (
				<MediaPlayer
					className="w-full h-[500px]"
					aspectRatio={9 / 16}
					src={item.url}
				>
					<MediaProvider />
					<PlyrLayout icons={plyrLayoutIcons} />
				</MediaPlayer>
			);
		} else {
			return (
				<img
					src={item.url}
					alt={`product-${currentMediaIndex}`}
					className="object-cover w-full"
				/>
			);
		}
	};

	if (!media || media.length === 0) {
		return (
			<div className="p-4 text-center">
				No media available for this product.
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="w-full mb-4">{renderMedia(media[currentMediaIndex])}</div>
			<div className="flex justify-center w-full overflow-x-auto">
				{media.map((item, index) => (
					<div
						key={item._id || index}
						className={`cursor-pointer mx-2 ${
							index === currentMediaIndex ? "border-2 border-primary" : ""
						}`}
						onClick={() => handleThumbnailClick(index)}
					>
						{item.type === "youtube" ? (
							<img
								src={`https://img.youtube.com/vi/${item.videoId}/0.jpg`}
								alt={`thumbnail-${index}`}
								className="object-cover w-20 h-20"
							/>
						) : (
							<img
								src={item.url}
								alt={`thumbnail-${index}`}
								className="object-cover w-20 h-20"
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductMediaCarousel;
