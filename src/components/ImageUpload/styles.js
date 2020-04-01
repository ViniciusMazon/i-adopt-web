import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78E5D5;
`;

const dragReject = css`
  border-color: #E57878;
`;

export const DropContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const DropContent = styled.div.attrs({
  className: 'dropzone'
})`
  width: 100px;
  height: 100px;
  border: 1px dashed #DDD;
  border-radius: 100%;
  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive}
  ${props => props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#999',
  error: '#E57878',
  success: '#78E5D5'
}

export const UploadMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${props => messageColors[props.type || 'default']}
`;
