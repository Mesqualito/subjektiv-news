package de.subjektiv_news.service.mapper;

import de.subjektiv_news.domain.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class DocumentMapper {
    private final Logger log = LoggerFactory.getLogger(DocumentMapper.class);

    public Document multipartFileToDocument(MultipartFile file) {
        Document document = new Document();
        document.setTitle(file.getOriginalFilename());
        document.setFileSize(file.getSize());
        document.setMimeType(file.getContentType());
        try {
            document.addContent(file.getBytes());
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return document;
    }
}
