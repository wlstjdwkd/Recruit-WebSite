package com.example.Recruit.persistence;

import com.example.Recruit.model.AppliEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppliRepository extends JpaRepository<AppliEntity, String> {
    @Query("select t from AppliEntity t where t.userId=?1")
    List<AppliEntity> findByUserId(String userId);

    @Query("select t from AppliEntity t where t.postId=?1")
    List<AppliEntity> findByPostId(String postId);
}
