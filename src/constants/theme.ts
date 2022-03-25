export enum Colors {
	RED = "#db1d0b",
	GREEN = "#119c08",
	GRAY = "#6d6d6df2",
	YELLOW = "#a99c46",
	BLACK = "black",
}

export interface Theme {
	colors: {
		primary: {
			default: string;
			hover: string;
			active: string;
		};
		contentText: string;
		primaryText: {
			default: string;
			hover: string;
			active: string;
		};
		secondaryText: {
			default: string;
			hover: string;
			active: string;
			text: string;
			white: string;
		};
		background: {
			content: string;
			contentSecondary: string;
			menu: string;
			secondaryMenu: string;
			darker: string;
			lightGray: string;
			primary: {
				primary: string;
				hover: string;
				active: string;
			};
			table: {
				heading: string;
				headingSort: string;
			};
		};
		border: {
			context: string;
		};
		forms: {
			border: string;
			labelBorder: string;
			slider: string;
			select: string;
		};
		sectionsDivider: string;
	};
	margin: string;
	marginDouble: string;
	padding: string;
	boxShadow: string;
	boxShadowFine: string;
	boxShadowHalf: string;
	boxShadowSharp: string;
	boxShadowSharpHover: string;
	boxShadowSharpActive: string;
}

export const lightTheme = {
	text: {
		primary: "#008033",
		gray: "#696969",
		label: "black",
		white: "#fff",
		orange: "#F47b20",
	},
	border: {
		default: "#eeeeee",
	},
	panel:{
		default: "rgb(153, 153, 153)",
		hover: "#008033",
	},
	navigation: {
		hover: "#f7f7f7",
	},
	background: {
		environment: {
			default: "#f1f1f1",
			active: "#fff",
			hover: "#f9f9f9",
		},
		language: {
			default: "#f1f1f1",
			active: "#fff",
			hover: "#f9f9f9",
		}
	},
	colors: {
		primary: {
			default: "#008033",
			hover: "#125e4a",
			active: "#0e4738",
		},
		contentText: "#000",
		primaryText: {
			default: "#333",
			hover: "#222",
			active: "#111",
		},
		secondaryText: {
			default: "#999",
			hover: "#666",
			active: "#333",
			text: "#17785e",
			white: "#fff",
		},
		background: {
			content: "#fff",
			contentSecondary: "#fcfcfc",
			menu: "#f6f6f6",
			secondaryMenu: "#f8f8f8",
			darker: "#ccc",
			lightGray: "#e4e4e45c",
			primary: {
				primary: "#17785e",
				hover: "rgba(23, 120, 94, .12)",
				active: "rgba(23, 120, 94, .25)",
			},
			table: {
				heading: "#c5ddd7",
				headingSort: "#c5ddd7",
			},
		},
		border: {
			context: "#cecfd0",
		},
		forms: {
			border: "#b8b8b8",
			labelBorder: "#d8d8d8",
			slider: "#f5f5f5",
			select: "#ffff",
		},
		sectionsDivider: "#e6e6e6",
	},
	margin: "10px",
	marginDouble: "20px",
	padding: "10px",
	boxShadow: "0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.05)",
	boxShadowFine: "0 2px 8px 1px #17785e, 0px 2px 6px -1px #17785e",
	boxShadowHalf:
		"0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.05)",
	boxShadowSharp:
		"0 2px 4px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px -1px rgba(0,0,0,0.5)",
	boxShadowSharpHover:
		"0 2px 8px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px -1px rgba(0,0,0,0.5)",
	boxShadowSharpActive:
		"0 2px 16px 1px rgba(0, 0, 0, 0.2), 0px 2px 12px -1px rgba(0,0,0,0.75)",
};

export const darkTheme = {
	text: {
		primary: "#00aeef",
		gray: "#808080",
		label: "black",
		white: "#fff",
		orange: "#F47b20",
	},
	colors: {
		primary: {
			default: "#0c8060",
			hover: "#19FFC2",
			active: "#27a281",
		},
		contentText: "#ccc",
		primaryText: {
			default: "#ccc",
			hover: "#ddd",
			active: "#eee",
		},
		secondaryText: {
			default: "#999",
			hover: "#bbb",
			active: "#ddd",
			text: "#ccc",
			white: "#fff",
		},
		background: {
			content: "#212121",
			contentSecondary: "#292929",
			menu: "#333",
			secondaryMenu: "#444",
			darker: "#555",
			lightGray: "#212121",
			primary: {
				primary: "#0c8060",
				hover: "rgba(23, 120, 94, .55)",
				active: "rgba(23, 120, 94, .42)",
			},
			table: {
				heading: "#1a614e",
				headingSort: "#292929",
			},
		},
		border: {
			context: "#444",
		},
		forms: {
			border: "#5d5d5d",
			labelBorder: "#484848",
			slider: "#444",
			select: "#444",
		},
		sectionsDivider: "#3d3d3d",
	},
	margin: "10px",
	marginDouble: "20px",
	padding: "10px",
	boxShadow: "0 1px 8px 1px rgba(0, 0, 0, 0.1), 0 0 4px 2px rgba(0, 0, 0, 0.5)",
	boxShadowFine: "0 2px 8px 1px #00b987, 0px 2px 6px -1px #00b987",
	boxShadowHalf:
		"0 1px 4px 1px rgba(0, 0, 0, 0.1), 0 0 2px 1px rgba(0, 0, 0, 0.5)",
	boxShadowSharp:
		"0 2px 4px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px -1px rgba(0,0,0,.5)",
	boxShadowSharpHover:
		"0 2px 8px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px -1px rgba(0,0,0,.5)",
	boxShadowSharpActive:
		"0 2px 16px 1px rgba(0, 0, 0, 0.2), 0px 2px 12px -1px rgba(0,0,0,.75)",
};

const breakpoints = {
	smallTo: "800px",
	mediumFrom: "801px",
	mediumTo: "1000px",
	largeFrom: "1001px",
	largeTo: "1200px",
	extraLargeFrom: "1201px",
	extraLargeTo: "1400px",
	maximumFrom: "1401px",
};

export const device = {
	small: `(max-width: ${breakpoints.smallTo})`,
	mediumOnly: `(min-width: ${breakpoints.mediumFrom}) and (max-width: ${breakpoints.mediumTo})`,
	medium: `(max-width: ${breakpoints.mediumTo})`,
	largeOnly: `(min-width: ${breakpoints.largeFrom}) and (max-width: ${breakpoints.largeTo})`,
	large: `(max-width: ${breakpoints.largeTo})`,
	extraLargeOnly: `(min-width: ${breakpoints.extraLargeFrom}) and (max-width: ${breakpoints.extraLargeTo})`,
	extraLarge: `(max-width: ${breakpoints.extraLargeTo})`,
	maximum: `(min-width: ${breakpoints.maximumFrom})`,
};

