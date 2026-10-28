package kr.hs.after.serverapi.member.mapper;

import kr.hs.after.serverapi.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    void insert(Member member);

    boolean existsByUsername(String username);

    boolean existsByPhone(String phone);

    Member findByUsername(String username);

    Member findById(Long id);

    boolean existsByUsernameExcludingId(@Param("username") String username, @Param("id") Long id);

    int updateProfile(@Param("id") Long id, @Param("name") String name, @Param("username") String username);
}
