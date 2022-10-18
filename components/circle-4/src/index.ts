import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { IntrinsicLoadingCircle } from '@njt-tools-open/icon-loading-solidjs-types/typings/circle';

const createElement = ({
  width = '100%',
  fills = ['#306fbe'],
}: IntrinsicLoadingCircle) => {
  class Loading extends LitElement {
    static styles = css`
      :host {
        display: inline-block;
        vertial-align: middle;
        width: 100%;
        height: 100%;
      }
      @keyframes loadingCircle {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      section {
        display: inline-block;
      }
      circle {
        transform-origin: center;
        animation: loadingCircle 1.2s linear infinite;
      }
      circle:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
      }
      circle:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
      }
      circle:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
      }
      circle:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
      }
      circle:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
      }
      circle:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
      }
      circle:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
      }
      circle:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
      }
      circle:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
      }
      circle:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
      }
      circle:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
      }
      circle:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
      }
    `;

    @property()
    ['width']: string = width;

    @property({ type: Array })
    ['fills']: string[] = fills;

    svg = () => {
      const { fills } = this;

      return html`
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
          <circle cx="512" cy="60" r="60" fill="${fills[0]}" />
        </svg>
      `;
    };

    render() {
      const { width } = this;
      const style = `width: ${width}; height: ${width}`;

      return html` <section style="${style}">${this.svg()}</section> `;
    }

    connectedCallback() {
      super.connectedCallback();
    }
  }

  return Loading;
};

let isDefined = false;

const register = (
  name = 'loading-circle-4',
  options: IntrinsicLoadingCircle = {}
) => {
  if (isDefined) {
    return;
  }
  isDefined = true;
  const Loading = createElement(options);
  window.customElements.define(name, Loading);
};

export { register };
