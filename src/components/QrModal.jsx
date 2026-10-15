import React, { useEffect, useRef } from 'react';
import { Download, X } from 'lucide-react';

export const QrModal = ({ isOpen, onClose, qrSrc = '/qr_douyin.png' }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="community-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-modal-title"
      onMouseDown={(event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
      }}
    >
      <div ref={modalRef} className="community-modal">
        <button type="button" className="community-modal-close" onClick={onClose} aria-label="关闭二维码弹窗"><X size={18} aria-hidden="true" /></button>
        <span className="section-eyebrow">SCAN TO JOIN / 抖音群聊</span>
        <h2 id="community-modal-title">一起进入 WowLand</h2>
        <p>保存二维码后，打开抖音扫一扫，加入群聊获取活动信息。</p>
        <div className="community-modal-qr">
          <img
            src={qrSrc}
            alt="WowLand 抖音群聊二维码大图"
            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/qr_douyin_community.png'; }}
          />
        </div>
        <div className="community-modal-actions">
          <a href={qrSrc} download="WowLand_抖音群聊二维码.png"><Download size={16} aria-hidden="true" /> 保存二维码</a>
          <button type="button" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
};
