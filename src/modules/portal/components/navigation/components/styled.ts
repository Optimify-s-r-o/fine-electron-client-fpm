import styled from "styled-components";
import {Column} from "../../../../../constants/globalStyles";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: calc(100% - 82px);
	border-bottom:  1px solid ${(props) => props.theme.border.default};
`;

export const Menu = styled.div<{
    isOpen?: boolean;
    clicked: string;
}>`
	position: relative;
	
	margin-top: 2px;
	padding: 6px 8px 6px 8px;

	${(props) =>
    props.isOpen && `background-color: ${props.theme.colors.background.menu};`}
	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.8rem;
	white-space: nowrap;
	display: block;

	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.navigation.hover};
	}

	&:hover > div {
		width: 250px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
		display: ${(props) => props.clicked};
	}
`;

export const SubMenu = styled(Column)`
	position: absolute;
	z-index: 999999999;

	display: none;

	top: 29px;
	left: 1px;

	padding: 2px 0 4px;

	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
`;

export const SubMenuItem = styled.span`
	width: 100%;
	display: block;
	padding: 5px 16px;
	text-decoration: none;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;


export const NewWindow = styled.div`
	width: 100%;
	display: block;
	padding: 5px 16px;
	text-decoration: none;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;


export const SubMenuWrapper = styled.div`
	display: flex;
	flex-direction: row;

	margin-top: 2px;

	background-color: transparent;
	color: ${(props) => props.theme.colors.primaryText.default};

	cursor: default;

	${SubMenuItem}, ${SubMenuItem} * {
		cursor: default;
	}

	${NewWindow}, ${NewWindow} * {
		cursor: default;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.primary.default};

		${SubMenuItem}, ${SubMenuItem} * {
			color: ${(props) => props.theme.colors.secondaryText.white};
		}

		${NewWindow}, ${NewWindow} * {
			color: ${(props) => props.theme.colors.secondaryText.white};
		}
	}
`;

export const Icon = styled.div`
	display: inline-block;

	width: 15px;

	margin: -3px 8px -1px 0;

	text-align: center;

	svg {
		font-size: 12px;
	}
`;

export const Title = styled.span`
	color: ${(props) => props.theme.colors.primaryText.default};
`;

export const Shortcut = styled.span`
	float: right;
	margin-left: 8px;
	margin-top: 2px;
	font-size: 10px;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;
