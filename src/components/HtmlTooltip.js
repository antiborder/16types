import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styled from "styled-components";

const HtmlTooltip = styled(({ className, backgroundColor, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    ${({ backgroundColor }) => `
      & .${tooltipClasses.tooltip} {
        background-color: ${backgroundColor};
        color: rgba(255, 255, 255, 0.87);
        text-align: center;
      }
    `}
  `;
export default HtmlTooltip;
