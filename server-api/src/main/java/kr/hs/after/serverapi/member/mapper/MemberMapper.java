package kr.hs.after.serverapi.member.mapper;

import kr.hs.after.serverapi.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    void insert(Member member);
    boolean existsByUsername(String username);
    boolean existsByPhone(String phone);
    Member findByUsername(String username);
    Member findById(Long id);
}
