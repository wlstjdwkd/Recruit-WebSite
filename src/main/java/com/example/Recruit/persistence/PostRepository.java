package com.example.Recruit.persistence;

import com.example.Recruit.model.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, String> {
    @Query("select t from PostEntity  t where t.userId=?1")
    List<PostEntity> findByUserId(String userId);
}
