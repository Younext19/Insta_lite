package com.univrouen.backend.config;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

public class FileTypeDetector {
    private static final Tika tika = new Tika();

    public static String determineFileType(File file) throws IOException {
        return tika.detect(file);
    }

    // Si vous travaillez avec Path plutôt que File
    public static String determineFileType(Path path) throws IOException {
        return tika.detect(path);
    }
}
