const startDownload = (url, handler, progress) => {
    return $http.download({
      url: url,
      showsProgress: progress ? true : false,
      backgroundFetch: true,
      progress: progress,
      handler: handler
    });
  },
  downloadImage = (url, saveToAlbum = true) => {
    $http.download({
      url: url,
      showsProgress: true, // Optional, default is true
      backgroundFetch: true, // Optional, default is false
      progress: function (bytesWritten, totalBytes) {
        const percentage = (bytesWritten * 1.0) / totalBytes;
      },
      handler: function (resp) {
        if (saveToAlbum) {
          $photo.save({
            data: resp.data,
            handler: function (success) {}
          });
        } else {
          $share.sheet(resp.data);
        }
      }
    });
  };
