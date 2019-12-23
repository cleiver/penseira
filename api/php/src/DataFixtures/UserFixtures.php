<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user
            ->setEmail('john@toe.tech')
            ->setPassword('$argon2id$v=19$m=65536,t=4,p=1$Qwf7mYgwUOFUMTpxqNtwQQ$hhjQZFavBpgyL5+dLN+vjku+vgfhYSrPQ79oj/F1Y7Y');

        $manager->persist($user);
        $manager->flush();
    }
}
