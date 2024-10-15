package dev.mtk14m.quickstart.repository;

import dev.mtk14m.quickstart.model.Content;
import org.springframework.data.repository.ListCrudRepository;

public interface ContentRepository extends ListCrudRepository<Content, Integer> {

}
