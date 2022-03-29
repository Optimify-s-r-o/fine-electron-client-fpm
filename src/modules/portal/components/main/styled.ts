import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;

  background-color: ${(props) => props.theme.main.default};
  width: 100%;
`;

export const MainSection = styled.section`
  width: 100%;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 auto;

  min-height: 0;
  overflow: auto;

  margin-top: 8px;
`

export const MainFormContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 auto;

  min-height: 0;
  overflow: auto;

  margin-top: 8px;
`

export const ContentWrapper = styled.div`
	flex: 1 1 auto;
    padding: 0 14px;
`;

export const ButtonsWrapper = styled.div`
	flex: 0 0 auto;
	align-self: flex-end;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: row;

	width: 100%;

	padding: 8px 24px;

    background-color: ${(props) => props.theme.footer.default};
	border-top: 2px solid ${(props) => props.theme.colors.background.menu};
`;