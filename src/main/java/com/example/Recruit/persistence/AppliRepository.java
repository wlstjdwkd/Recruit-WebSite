package com.example.Recruit.persistence;

import com.example.Recruit.model.AppliEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppliRepository extends JpaRepository<AppliEntity, String> {
    @Query("select t from AppliEntity t where t.userId=?1")
    List<AppliEntity> findByUserId(String userId);
}
