import React from 'react';
import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import { Refresh, ErrorOutline, WifiOff, Comment } from '@mui/icons-material';

const ErrorFallback = ({ type, onRetry, message }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'video-fetch':
        return {
          icon: <WifiOff sx={{ fontSize: 40, color: 'warning.main' }} />,
          title: 'Videolarni yuklab bo‘lmadi',
          message: message || 'Internet aloqasini tekshiring yoki keyinroq qayta urinib ko‘ring.',
          severity: 'warning'
        };
      
      case 'comment-error':
        return {
          icon: <Comment sx={{ fontSize: 40, color: 'error.main' }} />,
          title: 'Izoh yozib bo‘lmadi',
          message: message || 'Izohni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
          severity: 'error'
        };
      
      case 'channel-error':
        return {
          icon: <ErrorOutline sx={{ fontSize: 40, color: 'info.main' }} />,
          title: 'Kanal ma‘lumotlari topilmadi',
          message: message || 'Kanal haqida ma‘lumot olishda xatolik yuz berdi.',
          severity: 'info'
        };
      
      case 'network-error':
        return {
          icon: <WifiOff sx={{ fontSize: 40, color: 'error.main' }} />,
          title: 'Tarmoq xatosi',
          message: message || 'Server bilan bog‘lanishda xatolik yuz berdi.',
          severity: 'error'
        };
      
      default:
        return {
          icon: <ErrorOutline sx={{ fontSize: 40, color: 'error.main' }} />,
          title: 'Xatolik yuz berdi',
          message: message || 'Noma‘lum xatolik yuz berdi.',
          severity: 'error'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <Box sx={{ p: 2, m: 1 }}>
      <Alert 
        severity={errorContent.severity}
        action={
          <Button 
            color="inherit" 
            size="small" 
            startIcon={<Refresh />}
            onClick={onRetry}
          >
            Qayta urinish
          </Button>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {errorContent.icon}
          {errorContent.title}
        </AlertTitle>
        {errorContent.message}
      </Alert>
    </Box>
  );
};

export default ErrorFallback;
