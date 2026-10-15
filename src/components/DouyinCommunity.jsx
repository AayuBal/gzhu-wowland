import React, { useState } from 'react';
import { ArrowRight, Download, Maximize2 } from 'lucide-react';

const WECHAT_QR = '/assets/wechat_lead_qr.jpg';

export const DouyinCommunity = ({ onOpenQrModal }) => {
  const [douyinQr, setDouyinQr] = useState('/qr_douyin.png');

  return (
    <section id="community" className="community-section scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="community-heading">
          <div>
            <span className="section-eyebrow">FIND YOUR PEOPLE / 加入社群</span>
            <h2>找到同路人，<br />从这里开始。</h2>
          </div>
          <p>想了解活动、认识同伴，可以选择抖音群聊，或添加负责人微信进入微信群。</p>
        </div>

        <div className="community-grid">
          <article className="community-card community-card-douyin">
            <div className="community-card-top"><span>01 / 抖音群聊</span><span>DIRECT JOIN ↗</span></div>
            <div className="community-card-body">
              <button type="button" className="community-qr-frame" onClick={onOpenQrModal} aria-label="放大抖音社群二维码">
                <img
                  src={douyinQr}
                  alt="WowLand 抖音群聊二维码"
                  loading="lazy"
                  onError={() => setDouyinQr('/qr_douyin_community.png')}
                />
                <span className="community-qr-zoom"><Maximize2 size={15} aria-hidden="true" /> 点击放大</span>
              </button>
              <div className="community-card-copy">
                <span className="community-sticker">扫 码 即 可 加 入</span>
                <h3>在抖音群聊<br />接住下一次活动</h3>
                <p>扫码加入 WowLand 抖音群聊，获取活动信息、学习资源与经验分享。具体安排以各项目通知为准。</p>
                <div className="community-actions">
                  <button type="button" onClick={onOpenQrModal}><Maximize2 size={15} aria-hidden="true" /> 放大二维码</button>
                  <a href={douyinQr} download="WowLand_抖音群聊二维码.png"><Download size={15} aria-hidden="true" /> 保存图片</a>
                </div>
              </div>
            </div>
          </article>

          <article className="community-card community-card-wechat">
            <div className="community-card-top"><span>02 / 微信群</span><span>ASK TO JOIN ↗</span></div>
            <div className="community-card-body">
              <a className="community-qr-frame" href={WECHAT_QR} target="_blank" rel="noreferrer" aria-label="查看负责人微信二维码大图">
                <img src={WECHAT_QR} alt="负责人微信二维码，微信号 onlybal" loading="lazy" />
                <span className="community-qr-zoom"><Maximize2 size={15} aria-hidden="true" /> 查看大图</span>
              </a>
              <div className="community-card-copy">
                <span className="community-sticker">先 加 负 责 人</span>
                <h3>添加负责人微信，<br />邀请你进群</h3>
                <p>扫码添加负责人，备注「WowLand」，由负责人邀请进入微信群。也可以搜索微信号：</p>
                <div className="community-wechat-id"><span>微信号</span><strong>onlybal</strong></div>
                <div className="community-actions">
                  <a href={WECHAT_QR} target="_blank" rel="noreferrer"><Maximize2 size={15} aria-hidden="true" /> 查看大图</a>
                  <a href={WECHAT_QR} download="WowLand_负责人微信二维码.jpg"><Download size={15} aria-hidden="true" /> 保存图片</a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <a href="#event" className="community-event-link">先看看近期活动 <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
};
