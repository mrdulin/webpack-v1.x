import style from './index.module.scss';

const html = `
    <a href="#" class=${style.linkSmall}>链接</a>
    <button type='button' class=${style.buttonPrimary}>按钮（主要）</button>
    <ul class=${style.listM}>
        <li>博多之子</li>
        <li>Earth Quake</li>
        <li>A.I</li>
    </ul>
`;

document.body.innerHTML = html;

