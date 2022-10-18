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
        100% {
          transform: rotate(360deg);
        }
      }
      section {
        display: inline-block;
      }
      svg {
        animation: loadingCircle 1s infinite linear;
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
          <circle
            cx="512"
            cy="512"
            r="476"
            stroke="#efefef"
            stroke-width="70"
            fill="rgba(0, 0, 0, 0)"
          />
          <path
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3 0.1 19.9-16 36-35.9 36z"
            fill="${fills[0]}"
          ></path>
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
  name = 'loading-circle-5',
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
